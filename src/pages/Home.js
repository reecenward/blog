// import React from 'react';
// // import PostList from '../components/Home/PostList';
// // import useFetchPosts from '../hooks/useFetchPosts';
// // import LoadingSpinner from '../components/Home/LoadingSpinner';

// function Home() {
//   // const { posts, loading } = useFetchPosts();

//   return (
//     <div>

//     </div>
//   );
//   // return (
//   //   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//   //     <div className="container max-w-md">
//   //       <h1 className="text-3xl font-semibold text-center mb-4">Where it all begins</h1>
//   //       <div className="w-full">
//   //         {loading ? <LoadingSpinner /> : <PostList posts={posts} />}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
// }

// export default Home;

import React from 'react';
import Header from '../components/Home/Header';
import "../styles/home.css"

import Navbar2 from '../components/Navbar/Navbar2';

const Home = () => {
  return (
    <div className='home-wrapper'>
      <Header />
    </div>
  );
};

export default Home;
