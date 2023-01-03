import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import './Styles.modules.css';

function App() {

  const [userData, setData] = useState({})
  const [user, setUser] = useState('')

  async function handleForm(e) {
    e.preventDefault()
    if (user.length > 0) {
     try { 
      const response = await fetch(`https://api.github.com/users/${user}`)
      const data = await response.json()
      setData(data)
      setUser('')
     } catch {
        return <div className="errorMsg">Usuário não encontrado.</div>
     }
    }  
  }

  function userRepositories() {
    window.open(`https://github.com/${user}?tab=repositories`, '_blank')
  }

  return (
    <div className="App">
     <h1>GitHub finder</h1> 
      <div className="container1">
          <div className="search">
            <p>Busque por um usuário: </p>
              <input type="text" 
              name="user" 
              value={user} 
              onChange={e => setUser(e.target.value)} 
              autoFocus />
              <button onClick={handleForm}>
                <BsSearch />
              </button>
          </div>
      </div>

          {Object.keys(userData).length > 0 && (
            <div className="container2">
              <main className="main">
                <div className="img">
                  <img src={userData?.avatar_url} alt="avatar"></img>
                </div>

                <div className="login">
                  <span>{userData?.login}</span>
                </div>

                <div className="location">
                  <MdLocationPin />
                  <span>{userData?.location}</span>
                </div>

                <div className="followersfollowing">
                  <span>Seguidores: {userData?.followers} | </span>
                  <span>Seguindo: {userData?.following}</span>
                </div>

                <button onClick={userRepositories}>Ver repositórios</button>
              </main>
            </div>
            )}
    </div>
  );
}

export default App;
