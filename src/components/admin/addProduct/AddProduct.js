import React, {useState} from 'react';
import styles from './AddProduct.module.scss';
import Card from '../../cards/Card';
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../../../firebase/config'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/Loader';

const categories = [
  {id: 1, name:"Laptop"},
  {id: 2, name:"Electronics"},
  {id: 3, name:"Fashion"},
  {id: 4, name:"Phone"}
]

const storage = getStorage();

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: ""
}

const AddProduct = () => {
  const [product, setProduct] = useState({
    ...initialState
  })

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setProduct({...product, [name]: value})
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, `igShop/${Date.now()}${file.name}`);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, 
    (error) => {
      toast.error(error.message);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => {
          setProduct({...product, imageURL: downloadURL})
          toast.message("Image uploaded successfully");
      });
    }
    );

    
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try{
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      setUploadProgress(0);
      toast.success("Product uploaded successfully");
      navigate("/admin/all-products");
    }
    catch(error){
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.product}>
      <form onSubmit={addProduct}>
        <h1>Add New Product</h1>
          <Card cardClass={styles.card}>

            <label>Product name:</label>
            <input type="text" 
              placeholder="Product Name" 
              required name="name" 
              value={product.name}
              onChange={(e) => handleInputChange(e)} 
          />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
          
          {uploadProgress === 0 ? null : (
            <div className={styles.progress}>
            
              <div className={styles['progress-bar']}
              style={{ width: `${uploadProgress}%`}}
              >
                {uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Complete ${uploadProgress}`}
              </div>
            </div>
          )}


            <input 
              type="file" 
              accept="image/*" 
              placeholder="Product Image" 
              name="image" 
              onChange={(e) => handleImageChange(e)} 
            />

            {product.imageURL === "" ? null : (
              <input 
                type="text" 
                required 
                placeholder='Image URL'
                name="imageURL" 
                disabled 
                value={product.imageURL}
              />
            )}
        </Card>

            <input 
              type="number" 
              placeholder="Product Price" 
              required 
              name="price" 
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Category:</label>
            <select required name="category" value={product.category} onChange={(e) => handleInputChange(e)}>
              <option value="" disabled>
                -- Choose Product Category --
              </option>
              {categories.map((cat) => {
                return(
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                )
              })}
            </select>
            
            <label> Product Company/Brand:</label>
            <input 
              type="text"
              placeholder='Product Brand'
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Description</label>
            <textarea name="desc" required value={product.desc} onChange={(e) => handleInputChange(e)} cols="30" rows="10"></textarea>

            <button className='--btn --btn-primary'>Save Product</button>
        </Card>
      </form>
    </div>
    </>
  )
}

export default AddProduct;