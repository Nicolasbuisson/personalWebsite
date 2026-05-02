import styles from "./projectGalleryItem.module.css";

interface IProjectGalleryItemProps extends IProjectGalleryItem {
  index: number;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}

export const ProjectGalleryItem = (props: IProjectGalleryItemProps) => {
  const { index, title, imageSrc, color, setModal } = props;
  return (
    <div
      className={styles.projectGalleryItem}
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h3>{title}</h3>
      <p>Design & Development</p>
    </div>
  );
};
