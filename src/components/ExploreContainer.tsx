import React, { useEffect, useRef, useState } from 'react';
import Tab3Content from './Tab3content';
import './ExploreContainer.css';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem } from '@ionic/react';

interface ContainerProps {
  name: string;
}

const BASE_LINK = "https://pokeapi.co/api/v2/pokemon/"

const Tab1Content = () => {
  return  (<div>
   I am tab 1 content
  </div>)
   
}


const Tab2Content = () => {
  const [pokemon, setPokemon] = useState("pikachu")
  const [showResults, setResults] = useState<any>()
  const pokeNameref = useRef<any>(null)
  
  const PokeSearch = () => {

    if(pokeNameref.current){
      
      console.log(pokeNameref.current.value)
      setPokemon(pokeNameref.current.value.toLocaleLowerCase())
    }
  }
  
  useEffect(()=> {
    if(pokemon != ""){
      fetch(BASE_LINK + pokemon).then(async(poke)=> {
       const results = await poke.json()
       console.log(results.sprites)
       const {front_default} = results.sprites
       setResults({front_default})
      }).catch((err)=> console.log(err))
    }
  }, [pokemon])


  return  (
  <div style={{padding: ".5em"}}>
      <IonItem>
        <IonInput aria-label="Pokemon" value={pokemon} ref={pokeNameref}></IonInput>
      </IonItem>
      <IonButton onClick={()=> PokeSearch() }>search</IonButton>
 <IonCard>
      <IonCardHeader>
        <IonCardTitle>{pokemon}</IonCardTitle>
      
      </IonCardHeader>

      <IonCardContent>
         <img src={showResults ? showResults.front_default : ""} />
      </IonCardContent>
    </IonCard>
  </div>
  )
}

// const Tab3Content = () => {
//   return  (<div>
//    I am tab 3 content
//   </div>)
// }


const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
     {name.includes("Tab 1") ? <Tab1Content/> : name.includes("Tab 2") ? <Tab2Content/> : <Tab3Content/>}
    </div>
  );
};

export default ExploreContainer;
