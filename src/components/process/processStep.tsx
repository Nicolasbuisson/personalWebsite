import { Ref } from "react";
import styles from "./processStep.module.css";

export interface IProcessSteps {
  title: string;
  number: string;
  subtitle: string;
  content: string;
}

interface IProcessStepProps extends IProcessSteps {
  // the parent drives the scroll timeline, so it needs a handle on the container
  ref?: Ref<HTMLDivElement>;
}

export const ProcessStep = ({ ref, ...props }: IProcessStepProps) => {
  // styling todo
  return (
    <div ref={ref} className={styles.processStepContainer}>
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
