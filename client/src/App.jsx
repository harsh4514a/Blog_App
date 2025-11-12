import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import store from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import Dashboard from './pages/Dashboard';
import ThemeProvider from './components/ThemeProvider';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import ShowBlog from './pages/ShowBlog';
import ForgetPassword from './pages/ForgetPassword';
import ScrollToTop from './components/ScrollToTop';
import Search from './components/Search';
import ShowAllBlog from './pages/ShowAllBlog';





const App = () => {

    return (
        <>
            <PersistGate persistor={persistStore(store)}>
                <Provider store={store}>
                    <BrowserRouter>
                        <ScrollToTop />
                        <ThemeProvider>
                            <Header />
                            <Routes>
                                <Route path='/' element={<Home />} />
                               
                                <Route path='/contact' element={<Contact />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/blog/:blogSlug' element={<ShowBlog />} />
                                <Route path='/search' element={<Search />} />
                                <Route path='/forget-password' element={<ForgetPassword />} />
                                <Route path='/all-blog' element={<ShowAllBlog />} />

                                <Route element={<PrivateRoute />}>
                                    <Route path='/dashboard' element={<Dashboard />} />
                                    <Route path='/create-blog' element={<CreateBlog />} />
                                    <Route path='/update-blog/:blogId' element={<UpdateBlog />} />
                                </Route>

                                <Route element={<AdminPrivateRoute />}>
                                </Route>

                            </Routes>
                            <Footer />
                        </ThemeProvider>
                    </BrowserRouter>
                </Provider>
            </PersistGate>
        </>
    )
}
export default App


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Contact from './pages/Contact';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import store from './app/store';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import persistStore from 'redux-persist/es/persistStore';
// import Dashboard from './pages/Dashboard';
// import ThemeProvider from './components/ThemeProvider';
// import PrivateRoute from './components/PrivateRoute';
// import AdminPrivateRoute from './components/AdminPrivateRoute';
// import CreateBlog from './pages/CreateBlog';
// import UpdateBlog from './pages/UpdateBlog';
// import ShowBlog from './pages/ShowBlog';
// import ForgetPassword from './pages/ForgetPassword';
// import ScrollToTop from './components/ScrollToTop';
// import Search from './components/Search';

// // ✅ Import AllBlogs Page
// import AllBlogs from './components/AllBlogs';

// const App = () => {
//     return (
//         <>
//             <PersistGate persistor={persistStore(store)}>
//                 <Provider store={store}>
//                     <BrowserRouter>
//                         <ScrollToTop />
//                         <ThemeProvider>
//                             <Header />

//                             <Routes>
//                                 {/* Public Routes */}
//                                 <Route path='/' element={<Home />} />
//                                 <Route path='/contact' element={<Contact />} />
//                                 <Route path='/register' element={<Register />} />
//                                 <Route path='/login' element={<Login />} />
//                                 <Route path='/blog/:blogSlug' element={<ShowBlog />} />
//                                 <Route path='/search' element={<Search />} />
//                                 <Route path='/forget-password' element={<ForgetPassword />} />

//                                 {/* ✅ View All Blogs Page (Public) */}
//                                 <Route path='/all-blogs' element={<AllBlogs isAdmin={false} />} />

//                                 {/* Protected Routes (Only Logged-in Users) */}
//                                 <Route element={<PrivateRoute />}>
//                                     <Route path='/dashboard' element={<Dashboard />} />
//                                     <Route path='/create-blog' element={<CreateBlog />} />
//                                     <Route path='/update-blog/:blogId' element={<UpdateBlog />} />
//                                 </Route>

//                                 {/* Admin Routes */}
//                                 <Route element={<AdminPrivateRoute />}>
//                                     {/* ✅ Optional: Admin-only All Blogs Page */}
//                                     <Route path='/admin/all-blogs' element={<AllBlogs isAdmin={true} />} />
//                                 </Route>
//                             </Routes>

//                             <Footer />
//                         </ThemeProvider>
//                     </BrowserRouter>
//                 </Provider>
//             </PersistGate>
//         </>
//     );
// };

// export default App;
