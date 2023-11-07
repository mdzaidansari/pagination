import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
function App() {
  const [product, setProduct] = useState([])
  const [page, setPage] = useState(1)
  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    const data = await res.json()
    setProduct(data.products)
  };
  console.log(product);
  useEffect(() => {
    fetchProducts()
  }, []);


  const selectedPage = (selectpage) => {
    if(
      selectpage>=1 &&
      selectpage<=product.length/10 &&
      selectpage!==page
    )
      
    setPage(selectpage)
   
  }
  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>PEGINATION</h1>
      <div className='producs'>
        {
          product.slice(page * 10 - 10, page * 10).map((ele, index) => {
            return <div key={index} className='product__single' >
              <span className='product__single' >
                <img src={ele.thumbnail} alt={ele.title} /> <br />
                <span>{ele.title}</span>
              </span>
            </div>
          })
        }
      </div>
      {
        product.length > 0 && <div className='pagination'>
          <span onClick={() => selectedPage(page - 1)} className={page>1?'':'disable'}> ⬅️ </span>
          {
            [...Array(product.length / 10)].map((_, id) => {
              return <span
                className={page === id + 1 ? 'current__page' : ''}
                onClick={() => selectedPage(id + 1)}  >
                {id + 1}
              </span>
            })
          }

          <span onClick={() => selectedPage(page + 1)} className={page<product.length/10?'':'disable'}>➡️</span>
        </div>
      }
    </div>
  );
}

export default App;
