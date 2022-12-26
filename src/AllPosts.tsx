import { useParams } from 'react-router-dom';

export default function AllPosts() {
    const { pageNumber } = useParams();

    return (
        <>
        <h1>All Posts</h1>
        <p>Page Number: {pageNumber}</p>
        </>
    );
}