'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const owners = ['alonso', 'josue', 'sergio', 'blanca', 'Seleccionar dueño']

export function ProductItem({ product, onOwnerChange }) {
  const [owner, setOwner] = useState(product.owner || '')

  const handleOwnerChange = (value) => {
    setOwner(value)
    onOwnerChange(product.id, value)
  }

  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      <Select onValueChange={handleOwnerChange} value={owner}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar dueño" />
        </SelectTrigger>
        <SelectContent>
          {owners.map((ownerOption) => (
            <SelectItem key={ownerOption} value={ownerOption}>
              {ownerOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

