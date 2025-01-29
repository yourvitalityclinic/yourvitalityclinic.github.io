interface SectionsBarProps {
  sections: string[];
  colors: string[];
  dimColors: string[];
  currentSection: number;
}

function SectionsBar(props: SectionsBarProps) {
  return props.sections.map((x, i) => {
    if (i == props.currentSection) {
      return <span
        key={i}
        className='section-span current-section'
        style={{
          backgroundColor: props.colors[i]
        }}
      >{x}</span>
    } else {
      return <span
        key={i}
        className='section-span'
        style={{
          backgroundColor: props.dimColors[i]
        }}
      >{x}</span>
    }
  })
}

export default SectionsBar
