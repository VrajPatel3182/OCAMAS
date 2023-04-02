import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "@mui/material";

const VisitorHome = () => {
  const [product, setProducts] = useState([]);
  
  useEffect(() => {
    getProduct();
  },[]);
  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/viewproduct");
    result = await result.json();
    setProducts(result);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  const addproduct= async() =>{
    const user= JSON.stringify(localStorage.getItem('user'));
    const userid=user._id;
    let result = await fetch('http://localhost:5000/addtocart',{
            method: 'post',
            body:JSON.stringify({ userid}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        console.log(result)
  };

  

  return (
    <div>
      <div>
        {/* <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://c4.wallpaperflare.com/wallpaper/930/846/546/ultra-wide-razer-inc-wallpaper-thumb.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://c4.wallpaperflare.com/wallpaper/78/960/988/ultrawide-abstract-wallpaper-preview.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://c4.wallpaperflare.com/wallpaper/214/442/543/digital-art-son-goku-dragon-ball-dragon-ball-z-island-hd-wallpaper-preview.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
        <div className="">
          <div
            style={{
              padding:'30px',
              paddingBottom:'70px',
              backgroundColor: "black",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, sm:2, md: 3 }}
                columns={{ xs: 4, sm: 4, md: 12 }}
              >
                {product.map((item, itemkey) => (
                  <Grid md={4} key={itemkey}>
                    <Item>
                      <CardMedia
                        component="img"
                        height="500"
                        width="500"
                        image={`http://localhost:5000${item.picture}`}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          Rs.{item.price}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={()=>addproduct(item._id)} size="small">ADD TO CART</Button>
                        <Button size="small">Details</Button>
                      </CardActions>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisitorHome;