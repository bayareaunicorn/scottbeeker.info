import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import styles from './styles.module.css';
import './App.css';
import Home from './components/home/index.tsx';
import About from './components/about/index.tsx';
import ProjectsGrid from './components/projects/projectgrid/projectsgrid.tsx';
import Blog from './components/blog/index.tsx';
import Newsletter from './components/newsletter/index.tsx';
import Contact from './components/contact/index.tsx';
import Globie from "./components/globie/globie.tsx";


// interface MenuProps {
//     homeProps: String;
//     Projects: String;
//     Blog: String;
//     Contact: String;
// }


const HomePage = () => <h1 style={{ color: 'skyblue', fontSize: '32' }}>Home</h1>;
const AboutPage = () => <h1 style={{ color: 'skyblue', fontSize: '32' }}>About</h1>
const ProjectsPage = () => <h1 style={{ color: 'skyblue', fontSize: '32'}}>Projects</h1>;
const BlogPage = () => <h1 style={{ color: 'skyblue', fontSize: '32'}}>Blog</h1>;
const NewsletterPage = () => <h1 style={{ color: 'skyblue', fontSize: '32'}}>Newsletter</h1>
const ContactPage = () => <h1 style={{ color: 'skyblue', fontSize: '32'}}>Contact</h1>;


function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Router>
            <Globie>
            <div className="App">
                <button onClick={toggle} className="menu-button">
                    {isOpen ? 'Close Menu' : 'Open Menu'}
                </button>

                <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/newsletter">Newsletter</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="projects" element={<ProjectsGrid title={""} date={0} description={""} category={""} />} />
                <Route path="blog" element={<Blog />} />
                <Route path="newsletter" element={<Newsletter />} />
                <Route path="contact" element={<Contact />} />
            </Routes>
            </div>
            </Globie>
        </Router>
        
    );
}


export default App;