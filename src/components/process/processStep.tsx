import styles from "./processStep.module.css";

export interface IProcessSteps {
  title: string;
  number: string;
  subtitle: string;
  content: string;
}

export const ProcessStep = (props: IProcessSteps) => {
  return (
    <div className={styles.processStepContainer}>
      <div className={styles.processStepHeader}>
        <h4>
          <span>{props.number}</span> {props.title}
        </h4>
        <h5>{props.subtitle}</h5>
      </div>
      <p className={styles.processStepContent}>{props.content}</p>
    </div>
  );
};
