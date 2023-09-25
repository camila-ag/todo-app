const ProgressBar = ({progress}) => {
  const colors = [
    '#89E589',
    '#E589B7',
    '#E5C089',
    '#E58989'
  ]

  const random = colors[Math.floor(Math.random() * colors.length)]
    return (
      <div className="outer-bar">
        <div 
          className="inner-bar"
          style={{width: `${progress}%`, backgroundColor: random}}
          >

        </div>
      </div>
    );
  }
  
  export default ProgressBar;