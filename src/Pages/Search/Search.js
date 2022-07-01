import React,{useState,useEffect} from 'react'
import {  createTheme, TextField,Tabs ,Tab } from '@mui/material'
import { ThemeProvider } from '@mui/material'

import axios from "axios"
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';


export default function Search() {
    const [type, setType] = useState(0);
    const [page,setPage]=useState(1);
    const [searchText, setSearchText] = useState("");
    const [content,setContent]=useState();
    const [numOfPages,setNumOfPages]=useState();

    const darkTheme=createTheme({
      palette:{
        primary:{
          main:"#fff"
        }
      }
    })  

  
  const fetchSearch=async ()=>{
    const {data}= await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    setContent(data.results);
    setNumOfPages(data.total_pages)
  }  


  useEffect(()=>{
    window.scroll(0,0);
    fetchSearch()
  },[type,page,searchText])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <div style={{display:"flex",margin:"15px 0"}}>

        <TextField 
          style={{flex:1}}
          id="search-box" 
          label="Search" 
          variant="filled"
          onChange={(e)=> setSearchText(e.target.value)} />
      </div>
      <Tabs
        style={{margin:"10px"}}
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e,newVal)=>{
          setType(newVal);
          setPage(1);
        }}
      >
        <Tab style={{width:"50%"}} label="Search Movies"/>
        <Tab style={{width:"50%"}} label="Search TV Series"/>

      </Tabs>
      </ThemeProvider>
      <div className="trending">
      {
            content&& content.map((c)=>
              <SingleContent 
                key={c.id} 
                id={c.id} 
                poster={c.poster_path} 
                title={c.title||c.name} 
                date={c.first_air_date|| c.release_date}
                media_type={type?"tv":"movie"}
                vote_average={c.vote_average}
             />
            )
          }
        
        {numOfPages>1 &&(
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )} 
    
    </div>
    </div>
  )
}
