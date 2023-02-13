import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import styles from './ViewProducts.module.scss';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from "notiflix";
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';

const ViewProducts = () => 
{
  const { data, isLoading } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  
  const dispatch = useDispatch();

  useEffect (()=> {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data])

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

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product !!!',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Cancelled")
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      },
    );
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
                      {/* String interpolation */}
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color="red" onClick={() => {confirmDelete(id, imageURL)}}/>
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