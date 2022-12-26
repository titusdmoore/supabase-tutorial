import { useState, useEffect } from "react";
import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { supaClient } from "./supa-client";
import { useNavigate } from "react-router-dom";


export interface userProfile {
    username: string;
    avatarUrl?: string;
}

export interface SupabaseUserInfo {
    session: Session | null;
    profile: userProfile | null;
}

export function useSession(): SupabaseUserInfo {
    const [userInfo, setUserInfo] = useState<SupabaseUserInfo>({
        profile: null,
        session: null
    });
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);

    useEffect(() => {
        supaClient.auth.getSession().then(({ data: { session } }) => {
            setUserInfo({ ...userInfo, session });
            supaClient.auth.onAuthStateChange((_event, session) => {
                setUserInfo({ session, profile: null });
            });
        });
    }, []);

    useEffect(() => {
        if (userInfo.session?.user && !userInfo.profile) {
            listenToUserProfileChanges(userInfo.session.user.id).then(
                (newChannel) => {
                    if (channel) {
                        channel.unsubscribe();
                    }
                    setChannel(newChannel);
                });
        } else if (!userInfo.session?.user) {
            channel?.unsubscribe();
            setChannel(null);
        }
    }, [userInfo.session]);

    async function listenToUserProfileChanges(userId: string) {
        const { data } = await supaClient
            .from("user_profiles")
            .select("*")
            .filter("user_id", "eq", userId);

        if (data?.[0]) {
            setUserInfo({ ...userInfo, profile: data?.[0] })
        }

        supaClient
            .channel(`public:user_profiles`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "user_profiles",
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    setUserInfo({ ...userInfo, profile: payload.new as userProfile });
                }
            );
    }

    return userInfo;
} 