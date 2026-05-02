"use client";
import styles from "./projectGallery.module.css";
import { ProjectGalleryItem } from "../projectGalleryItem/projectGalleryItem";
import { useState } from "react";
import { ProjectGalleryModal } from "../projectGalleryModal/projectGalleryModal";

export const ProjectGallery = () => {
  const projects: IProjectGalleryItem[] = [
    {
      title: "Alexon Media",
      imageSrc: "/images/drone.jpg",
      color: "#000000",
    },
    {
      title: "Gourmandique",
      imageSrc: "/images/path.jpg",
      color: "#000000",
    },
    {
      title: "Other Project",
      imageSrc: "/images/palmTrees.jpg",
      color: "#000000",
    },
    {
      title: "Last Project",
      imageSrc: "/images/wine.jpg",
      color: "#000000",
    },
  ];

  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });

  return (
    <div className={styles.projectGallery}>
      {projects.map((project, index) => {
        return (
          <ProjectGalleryItem
            key={project.title}
            index={index}
            title={project.title}
            imageSrc={project.imageSrc}
            color={project.color}
            setModal={setModal}
          />
        );
      })}
      <ProjectGalleryModal modalState={modal} projects={projects} />
    </div>
  );
};
