import { Button } from "../button/button";
import styles from "./workPreviewDetails.module.css";
import { ArrowPathLink } from "../arrowPathLink/ArrowPathLink";

interface IWorkPreviewDetailsProps {
  client: string;
  location: string;
  description: string;
  services: string[];
  websiteUrl: string;
}

export const WorkPreviewDetails = (props: IWorkPreviewDetailsProps) => {
  const { client, location, description, services, websiteUrl } = props;

  return (
    <div className={styles.workPreviewDetailsContainer}>
      <div className={styles.workPreviewDetailsIndicator}>
        <div className={styles.workPreviewDetailsText}>
          <h4>{client}</h4>
          <p>Description: {description}</p>
          <p>
            Services:{" "}
            {services.map((tag) => {
              return <span key={`${client}-tag-${tag}`}>{tag}</span>;
            })}
          </p>
          <p>Location: {location}</p>
          <ArrowPathLink url={websiteUrl} text="Visit site" />
        </div>
      </div>
    </div>
  );
};
