import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';


let UUid = 0;
function getId() {
  return UUid++ + '';
}

const PRODUCTS = [
  {Category: "kategoria", Price: "0", Name: "nazwa"},
];

var dataFetched = false;

export default function App() {
const [productData, setProductData] = useState();
const [time, setTime] = useState()

var data=PRODUCTS;

 

const getApiData = async () => {
  const response = await fetch( 'api/products' 
  ).then((response) => response.json())
  .then(json => setProductData(json));
  
    const response2 = await fetch( 'api/time' 
  ).then((response2) => response2.json())
  .then(json => setTime(new Date(json.time)));
  
};

useEffect(() => {
  getApiData();
  
  dataFetched=true;
}, []);


if (dataFetched){
	data=productData
}
		
	const [koszykProducts, updateKoszyk] = useState([]);
    const [sum, setSum] = useState(0);	
	
	const AddToKoszyk = (product) => {
		let cart = [...koszykProducts, {id:getId(), Price: product.Price, Name: product.Name}]
		updateKoszyk(cart)
		setSum( cart.reduce( (total, product) => {return total + parseInt(product.Price)},0 ) )
}
	const DeleteFromKoszyk = (product) => {
		let cart =	koszykProducts.filter( (val) => {return val.id != product.id } );	
		updateKoszyk(cart);
		setSum( cart.reduce( (total, product) => {return total + parseInt(product.Price)},0 ) )
}


	
  return <div>
  	  <h1 className="title">
  <a href="/form">test form</a>
</h1>
<div>
{time &&
                    `Czas na serwerze ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
</div>
  <ProductTable products={data} AddToKoszyk={AddToKoszyk}/>
  <Koszyk products={koszykProducts} DeleteFromKoszyk={DeleteFromKoszyk} sum={sum}/>



  </div>
  ;
}


function ProductTable({ products, AddToKoszyk }) {
	
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.Category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.Category}
          key={product.Category} 
		  />
		  
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.Name} 
		updateKoszyk={AddToKoszyk}
		buttonText="Dodaj do koszyka"
		/>
    );
    lastCategory = product.Category;
  });

  return (
  <div>
    <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
	</div>
  );
}


function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th className="thCategory" colSpan="2">
        {category}
      </th>
    </tr>
  );
}


function ProductRow({ product, buttonText, updateKoszyk }) {
  return (
    <tr>
      <td>{product.Name}</td>
      <td>{product.Price}zł</td>
	  <td>    <button className="productB"
	  		  onClick={() => updateKoszyk(product)}
		  >
		  {buttonText}
    </button></td>
    </tr>
  );
}


function Koszyk({ products, DeleteFromKoszyk, sum}) {


  return (
<div>
<h2>Koszyk</h2>
  	  <KoszykTable products={products}	DeleteFromKoszyk={DeleteFromKoszyk}/>
	  <div id="kSuma">suma: {sum}zł </div>
</div>
  );

}

function KoszykTable({ products, DeleteFromKoszyk }) {
	
  const rows = [];
  products.forEach((product) => {

    rows.push(
      <ProductRow
        product={product}
        key={product.id} 
		updateKoszyk={DeleteFromKoszyk}
		buttonText="usuń"
		/>
    )
  });

  return (
  <div>
    <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
	</div>
  );
}
