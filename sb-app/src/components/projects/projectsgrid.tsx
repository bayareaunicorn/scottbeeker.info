import { useState, useCallback, useEffect, useRef, useMemo } from "react";

interface ProjectGridProps {
   title: string;
   date: number;
   description: string;
   category: string;
}




const ProjectGrid: React.FC<ProjectGridProps> = ({ title, date, description, category }) => {
    return (
        <div className="projectcontainer">
            <p>Title: {title}</p>
            <p>Date: {date}</p>
            <p>Description: {description}</p>
            <p>Category: {category}</p>
        </div>
    )
}

export default ProjectGrid;