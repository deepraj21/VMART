import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {


  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0])
    setFoodCat(response[1])

    //console.log(response[0],response[1]);


  }

  useEffect(() => {
    loadData()

  }, [])













  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Type in..." aria-label="Search" />
                <button className="btn text-white bg-primary" type="submit">Search</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/07/all-lays-chips.jpg?quality=82&strip=1&w=800" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://kidsstoppress.com/wp-content/uploads/2021/09/1566311846.BestStationeryStoresInIndore-Kidsstoppress-1-1024x576.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://c8.alamy.com/comp/WKF3YR/kiev-ukraine-september-4-2019-silpo-supermarket-shampoos-on-the-shelf-of-store-WKF3YR.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://i0.wp.com/thefooduntold.com/wp-content/uploads/2020/11/20201023_100954-1862025317-9-scaled.jpg?resize=750%2C563&ssl=1" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.shutterstock.com/image-photo/poznan-poland-jan-18-2017-600nw-561575542.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== []
                  ?
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]}

                          ></Card>

                        </div>

                      )
                    }
                    ) : <div>No Such Data Found</div>}
              </div>
              )
            })
            : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
