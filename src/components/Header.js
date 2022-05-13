import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {

  const onClick = () => {
    console.log("Click From Header")
  }

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button text='Add' onClick = {onClick} />
    </header>  
  )
}
 

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string,
  phrase: PropTypes.string,
}

const headingStyle = {
  color: 'red', 
  backgroundColor: 'blue'
}

export default Header
