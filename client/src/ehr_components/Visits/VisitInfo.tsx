import { PatientVisit } from "../data/new-visit-fields";

interface VisitInfoProps {
  className: string;
  selectedVisit?: PatientVisit;
  isAnimating: number;
  setIsAnimating: Function;
}

let sectionTitles = [
  ["date", "Date of Visit"],
  ["complaint", "Chief Complaint"],
  ["present_illness_history", "History of Present Illness"],
  ["other_system_review", "Review of Other Systems"],
  ["bp", "Blood Pressure"],
  ["pulse_rate", "Pulse Rate"],
  ["temperature", "Body Temperature"],
  ["respiratory_rate", "Respiratory Rate"],
  ["spo2", "Spo2"],
  ["weight", "Weight"],
  ["height", "Height"],
  ["bmi", "Body Mass Index"],
  ["lab_investigation", "Imaging and laboratory Investigations"],
  ["diagnosis", "Diagnosis"],
  ["treatment", "Treatment"],
  ["is_free", "Free Visit"],
  ["is_review", "Visit Review"],
  ["is_referred", "Referred"],
  ["cost", "Visit Cost"],
  ["notes", "Notes"]
];

export default function VisitInfo(props: VisitInfoProps) {
  let { className, selectedVisit, isAnimating, setIsAnimating } = props;

  if (!selectedVisit) return <></>;

  let displayedInfo = [];
  for (let section of sectionTitles) {
    let [key, title] = section;
    let text;

    if (key === "bp") {
      let diaValue = selectedVisit["bp_dia"];
      let bpValue = selectedVisit["bp_sys"];
      text = (
        <>
          <p className={`p-0 m-0 ${diaValue ? "" : "text-secondary"}`}>
            {`DIA: ${diaValue || "Not specified"}`}
          </p>
          <p className={`p-0 m-0 ${bpValue ? "" : "text-secondary"}`}>
            {`SYS: ${bpValue || "Not specified"}`}
          </p>
        </>
      );
    } else {
      let value = selectedVisit[key as keyof PatientVisit];
      text = (
        <p className={`p-0 m-0 ${value ? "" : "text-secondary"}`}>
          {value || "Not specified"}
        </p>
      );
    }

    let sectionElement = (
      <div className={key !== "notes" ? "mb-4" : ""} key={key}>
        <h5>{title}</h5>
        {text}
      </div>
    );

    displayedInfo.push(sectionElement);
  }

  return (
    <div className={className}>
      <div
        className="card shadow-sm p-4 animated-fade"
        onAnimationEnd={() => setIsAnimating(0)}
        data-animating={isAnimating}
      >
        {displayedInfo}
      </div>
    </div>
  );
}
