interface SectionsBarProps {
  sections: string[];
  colors: string[];
  dimColors: string[];
  currentSection: number;
}

function AltSectionsBar(props: SectionsBarProps) {
  return <span
    className="section-span current-section"
    style={{
      backgroundColor: props.colors[props.currentSection]
    }}>{props.sections[props.currentSection]}</span>
}

export default AltSectionsBar
