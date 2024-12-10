import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';

export async function POST(req) {
  try {
    await dbConnect();
    const { productId, owner } = await req.json();
    
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      { owner: owner },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return NextResponse.json({ success: false, error: 'Error al actualizar el producto' }, { status: 500 });
  }
}

