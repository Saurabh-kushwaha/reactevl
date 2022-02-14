import React, {useEffect,useRef, useState } from 'react'
import Productinput from './Productinput';
import { Wrapper,Table,Tbody} from './App.styled.js'

function Product() {
    let { data, fetchAPI, updateAPI } = Productinput([]);
    console.log(data);
    const [formData, setFormData] = useState("");
   
    const [pageNumber, setPageNumber] = useState(1);
  
    const fileRef = useRef();

    const onChangeHandler = (e) => {
        const { name, value } = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const btn = () => {
      updateAPI(
      fetch("http://localhost:3000/product", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })  
      )
    }
    
    useEffect(() => {
        fetchAPI(fetch(`http://localhost:3000/product?_page=${pageNumber}&_limit=5`))
    }, [pageNumber]);
    
    const pageManage = (value) => {
        setPageNumber(pageNumber + value)
    }
    

    const onDeleteItem = (a) => {
        
        fetch(`http://localhost:3000/product/${a}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err))
            .finally(() =>console.log("final delete"));
    }


    return (
        <>
        <Wrapper>
        <h1>Add Product</h1>       
        <div>
            <label>Titile</label>
            <input
                type="text"
                name = "Titile"  
                value={formData.Titile}
                onChange ={onChangeHandler}
            />
        </div>
        <div>
            <label>Cost</label>
              <input
                  type="number"
                  name='Cost'
                  value={formData.Cost}
                  onChange = {onChangeHandler}
              />
        </div>
        <div>
        Department      
            <select name='Category' value={formData.Category} onChange={onChangeHandler}>
            <option>Select</option>        
            <option>vegetables</option>
            <option>fruits</option>
            <option>provisions</option>
        </select>
        </div>  
       
        <div>
              <input
                  name='files'
                  ref={fileRef}
                  type="file"
                  onChange={onChangeHandler}
              />
        </div>
                
        <button onClick={btn}>Submit</button>
        
        <button disabled={pageNumber === 1 ? true : false} onClick={()=>pageManage(-1)}>Prev</button> 
        <button onClick={()=>pageManage(1)}>Next</button> 
                
        </Wrapper>
            <Table>
            <table border = "1">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Delete</th>
                    </tr>
                </thead> 
                {data.map((el) => {  
                       
                    return (
                        <>
                        <Tbody key={el.id}>
                            <tr>
                                <th>{el.id}</th>
                                <th>{el.Titile}</th>
                                <th>{el.Cost}</th>
                                <th>{el.Category}</th>
                                <th>{el.files}</th>
                                <button onClick={() => onDeleteItem(el.id)} >Delete</button>    
                            </tr>
                        </Tbody>
                        </>    
                    )
                })}   
            </table>
          </Table>
        </>    
    )
}
export default Product
