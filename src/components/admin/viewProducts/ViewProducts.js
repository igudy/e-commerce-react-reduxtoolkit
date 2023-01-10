import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import styles from './ViewProducts.module.scss';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';


const ViewProducts = () => 
{
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      getProducts();
    }, [])

    const getProducts = () => {
      setIsLoading(true);

    try{
      const productRef = collection(db, "products");
      const q = query(productRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch(error)
    {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const deleteProduct = async(id, imageURL) => {
    try{
      // For the id in the firestore database
      await deleteDoc(doc(db, "products", id));

      // For the storage section of firebase
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully");
    }
    catch(error){
      toast.error(error.message);
    }
  }
  
  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Products</h2>
      {products.length === 0 ? 
      (
        <p>No product found.</p>
      ) : 
      (
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const {id, imageURL, name, category, price} = product;
              return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td><img src={imageURL} alt={name} style={{width: "100px"}}/></td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to="/admin/add-product">
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color="red" onClick={() => {deleteProduct(id, imageURL)}}/>
                    </td>
                  </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default ViewProducts