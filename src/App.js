import logo from './logo.svg';
import './App.css';
import First from './First';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home1 from './Visiting/Visit-Tankaman/Home1';
import Video1 from './Visiting/Visit-Tankaman/Video1';
import About1 from './Visiting/Visit-Tankaman/About1';
import Login from './views/User/Login';
import Register from './views/User/Register';
import AdminLoginComponent from './views/Admin/AdminLogin';
import Landing from './views/User/Landing';
import CreateCourseForm from './views/Admin/CreateCourseForm';
import GetCourse from './views/Admin/GetCourse';
import CourseDetails from './views/Admin/CourseDetails';
import GetClientCourse from './views/User/GetClientCourse';
import ClientCourseDetails from './views/User/ClientCourseDetails'
import AdminNav from './views/Admin/AdminNav';
import AdminNotification from './views/Admin/AdminNotification';
import GetNotification from './views/User/GetNotification';

function Home() {
  return (
    <main>
      {/* <Header /> */}
      <Navbar />
      <First />
    </main>
  )
}

function Tankaman() {
  return (
    <main>
      <Home1 />
      <About1 />
      <Video1 />
    </main>
  )
}



function App() {
  return (


    <Routes>
      
      {/* Admin routes */}
      <Route path="/" element={<AdminLoginComponent />} />
      <Route path="/register" element={<Register />} />
      <Route path= "/create-course" element= {<CreateCourseForm />}/>
      <Route path="/get-course" element = {<GetCourse/>}/>
      <Route path="/course/:id" element = {<CourseDetails/>}/>
      <Route path="/admin-notification" element = {< AdminNotification/>}/>
      
      {/* Client routes */}
      <Route path="/client-login" element={<Login />} />
      <Route path='/get-client-course' element= { <GetClientCourse />} />
      <Route path='/client-course/:id' element= { <ClientCourseDetails />} />
      <Route path='/GetNotification/' element= { <GetNotification />} />
    </Routes>

  );
}

export default App;
