"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateItemPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    calories: 0,
    protein: 0,
    vitamins: { vitamin_C: '', vitamin_A: '' },
    minerals: { calcium: '', iron: '' },
    description: '',
    category: '',
    stock_quantity: 0,
    price: 0,
    discounted_price: 0,
    currency: 'INR',
    is_available: true,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'vitamins' | 'minerals', subField: string) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value.toString());
      }
    });
    if (imageFile) formDataToSend.append('image', imageFile);

    try {
      const response = await fetch('/api/users/createitem', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/items');
      } else {
        const errorData = await response.json();
        console.error("Error creating item:", errorData.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Create New Item</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="ID" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <input type="number" name="calories" placeholder="Calories" onChange={handleChange} />
        <input type="number" name="protein" placeholder="Protein" onChange={handleChange} />
        <input type="text" name="vitamin_C" placeholder="Vitamin C" onChange={(e) => handleNestedChange(e, 'vitamins', 'vitamin_C')} />
        <input type="text" name="vitamin_A" placeholder="Vitamin A" onChange={(e) => handleNestedChange(e, 'vitamins', 'vitamin_A')} />
        <input type="text" name="calcium" placeholder="Calcium" onChange={(e) => handleNestedChange(e, 'minerals', 'calcium')} />
        <input type="text" name="iron" placeholder="Iron" onChange={(e) => handleNestedChange(e, 'minerals', 'iron')} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <input type="number" name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="discounted_price" placeholder="Discounted Price" onChange={handleChange} />
        <input type="text" name="currency" placeholder="Currency" defaultValue="INR" onChange={handleChange} />
        <label>
          <input
            type="checkbox"
            name="is_available"
            checked={formData.is_available}
            onChange={(e) => setFormData((prev) => ({ ...prev, is_available: e.target.checked }))}
          />
          Available
        </label>
        <button type="submit" className=' m-5'>Create Item</button>
      </form>
    </div>
  );
};

export default CreateItemPage;
