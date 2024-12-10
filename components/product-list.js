'use client'

import { useState, useEffect } from 'react'
import { ProductItem } from './ui/product-item'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (data.success) {
          setProducts(data.products)
        } else {
          throw new Error(data.error || 'Error desconocido al obtener productos')
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleOwnerChange = async (productId, owner) => {
    try {
      const response = await fetch('/api/update-product-owner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, owner }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === productId ? { ...product, owner } : product
          )
        )
        console.log(`Producto ${productId} asignado a ${owner}`)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <div className="text-center">Cargando productos...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <div className="space-y-2">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onOwnerChange={handleOwnerChange}
          />
        ))}
      </div>
    </div>
  )
}

