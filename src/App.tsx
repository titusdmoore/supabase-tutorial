import { useState } from 'react';
import './App.css';
import MessageBoard from './MessageBoard';
import AllPosts from './AllPosts';
import Navbar from './navbar';
import PostView from './PostView';
import Welcome from './Welcome';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <MessageBoard />,
        children: [
          {
            path: ':pageNumber',
            element: <AllPosts />
          },
          {
            path: 'post/:postId',
            element: <PostView />
          }
        ]
      },
      {
        path: 'welcome',
        element: <Welcome />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}