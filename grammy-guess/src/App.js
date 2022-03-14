import Header from './components/Header'
import NomineeList from './components/NomineeList';
import Nav from './components/Nav';

function App() {
  const currentAwardName = 'Best Rap Album'

  return (
    <>
      <Header />
      <Nav />
      <NomineeList  currentAwardName={currentAwardName}/>
    </>
  );
}

export default App;
