import React, {useState} from 'react';
import styles from './AddProduct.module.scss';
import Card from '../../cards/Card';
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore"; 
import { db } from '../../../firebase/config'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';

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
  // useParams to get the particular id of that particular post
  const {id} = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, 
      {...initialState},
      productEdit
      )
      return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // detectForm is used to differentiate between the add and edit id.
  function detectForm(id, f1, f2){
    if(id === 'ADD'){
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setProduct({...product, [name]: value});
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
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({...product, imageURL: downloadURL})
          toast.message("Image uploaded successfully");
      });
    }
    );    
  };

  const addProduct = (e) => {
    e.preventDefault();
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

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try{
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    }
    catch(error){
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.product}>
      <form onSubmit={detectForm(id, addProduct, editProduct)}>
        <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
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

            <button className='--btn --btn-primary'>{detectForm(id, "Save Product", "Edit Button")}</button>
        </Card>
      </form>
    </div>
    </>
  )
}

export default AddProduct;