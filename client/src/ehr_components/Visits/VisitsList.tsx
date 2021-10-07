import { PatientVisit } from "../data/new-visit-fields";

interface VisitsListProps {
  className: string;
  visits: PatientVisit[];
  selectedVisit?: PatientVisit;
  onSelect: (id: string) => void;
}

export default function VisitsList(props: VisitsListProps) {
  let { className, visits, selectedVisit, onSelect } = props;

  let rows = visits.map(visit => {
    let { date, complaint, id } = visit;
    let isSelected = selectedVisit?.id === id;

    let handleSelect = () => {
      onSelect(id);
    };

    return (
      <button
        className={`list-group-item text-left ${isSelected ? "active" : ""}`}
        key={id}
        onClick={handleSelect}
      >
        <p>{complaint}</p>
        <p className={`p-0 m-0 ${isSelected ? "" : "text-secondary"}`}>
          {date}
        </p>
      </button>
    );
  });

  return (
    <div className={className}>
      <div className="card overflow-auto" style={{ maxHeight: 400 }}>
        <div className="list-group list-group-flush">{rows}</div>
      </div>
    </div>
  );
}
