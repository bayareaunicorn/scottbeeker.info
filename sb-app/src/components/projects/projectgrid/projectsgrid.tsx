import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import ProjectCard from "../projectcard/projectcard";

interface ProjectGridProps {
   category: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ category }) => {
    const data: any[] = []; // Replace this with your actual data array

    return (
        <div className="projectcontainer">
            <div className="project-carro">
                {data.map((d, i) => ( 
                    <div 
                        key={`${d.title}-${i}`}
                        className="col-sm-6 col-md-4 col-lg-4"
                    >
                        <ProjectCard
                            title={d.title}
                            projectimage={d.projectimage}
                            description={d.description}
                            category={d.category}
                            link={d.link}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectGrid;
