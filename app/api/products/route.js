import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';

const staticProducts = [
  { id: '90091-1', name: 'VINILO AUTOAD', price: 9.60 },
  { id: '90091-28', name: 'VINILO AUTOA', price: 19.20 },
  { id: '19452-1', name: 'CINTA AISLANT', price: 6.90 },
  { id: '20555-16', name: 'PELACABLES', price: 9.50 },
  { id: '51023-60', name: 'GORRO NAVIDE', price: 4.30 },
  { id: '19202-153', name: 'PRENSADOR D', price: 19.60 },
  { id: '23058-3', name: 'VINCHA PARA C', price: 3.50 },
  { id: '19455-23', name: 'JUEGO DE AGU', price: 4.80 },
  { id: '90055-114', name: 'EMBUDO DE P', price: 1.90 },
  { id: '90097-36', name: 'PINTURA EN S', price: 15.90 },
  { id: '19106-5', name: 'SOPORTE TRIAN', price: 12.60 },
  { id: '20063-5', name: 'MINI JENGA', price: 4.50 },
  { id: '20063-6', name: 'JENGA DE COLO', price: 5.30 },
  { id: 'TPXO36000', name: 'HERMETIC C', price: 3.50 },
  { id: '90055-66', name: 'TAZA 9* 10CM', price: 3.40 },
  { id: '8901810003682', name: 'INCIEN', price: 2.50 },
  { id: '90030-1', name: 'POKER', price: 1.70 },
  { id: 'JBXO10000', name: 'JABONERA P', price: 1.10 },
  { id: '90146-287', name: 'BATIDORA EL', price: 17.70 },
  { id: '8901810009927', name: 'INCIEN', price: 2.50 },
  { id: '90099-401', name: 'SOPORTE TRIA', price: 1.10 },
  { id: '90099-37', name: 'SOPORTE TRIA', price: 7.80 },
  { id: '8901810272866', name: 'INCIEN', price: 4.90 },
  { id: '90099-207', name: 'MINIALICAT', price: 7.90 },
  { id: '20560-83', name: 'LLAVE INGLES', price: 10.50 },
  { id: '90260-2', name: 'BOTELLA DE DE', price: 7.20 },
  { id: '90159-7', name: 'CUBOS DE HIEL', price: 2.20 },
  { id: '90159-12', name: 'CUBOS DE HIE', price: 2.20 },
  { id: '90117-185', name: 'MOLDE PARA', price: 2.60 },
  { id: '90005-21', name: 'BOLSA DE REG', price: 0.80 },
  { id: '90005-24', name: 'BOLSA DE REG', price: 1.80 },
  { id: '90076-5', name: 'ABANICO', price: 2.80 },
  { id: 'XY328-A4', name: 'SET DE TRACT', price: 9.40 },
  { id: 'CU-1628517', name: 'MUNECA CON', price: 7.20 },
  { id: '90108-273', name: 'PAPELERA', price: 5.50 },
  { id: 'JBXO100001', name: 'JABONERA', price: 1.10 },
  { id: 'JABONERA-PATITO', name: 'JABONERA PATITO', price: 2.60 },
  { id: 'CINTA-EMBALAJE', name: 'CINTA EMBALAJE', price: 8.90 },
  { id: 'SHIN-RAILGUN', name: 'Shin Railgun Starry Cheese', price: 10.50 },
  { id: 'TALLARIN-CARBONARA', name: 'TallarRIN CARBONARA', price: 11.80 },
  { id: 'CURRY', name: 'Curry', price: 34.22 },
  { id: 'MARSHMELLO', name: 'Marshmello', price: 5.78 },
  { id: 'PANKO', name: 'Panko', price: 5.31 },
  { id: 'MARSHMELO-CHINO', name: 'Marshmelo chino', price: 5.66 },
  { id: 'CARAMELO-MANGO', name: 'Caramelo mango', price: 5.66 },
  { id: 'TALLARIN-HABANERO', name: 'Tallarín habanero lime', price: 7.67 },
  { id: 'TE-GANMAO', name: 'Té Ganmao Beverage', price: 17.70 },
  { id: 'SAL-OSTION', name: 'Sal ostión', price: 5.66 },
  { id: 'ACEITE-AJONJOLI', name: 'Aceite ajonjolí', price: 4.72 },
  { id: 'ACEITE-OLIVA', name: 'Aceite oliva', price: 64.90 },
  { id: 'TALLARIN-BULDAK', name: 'Tallarín Buldak spicy', price: 10.50 },
  { id: 'SAKE-ARROZ', name: 'Sake arroz', price: 17.35 },
  { id: 'BEBIDA-DURAZNO', name: 'Bebida durazno', price: 5.19 },
  { id: 'PASTELITO', name: 'Pastelito', price: 2.95 },
  { id: 'WASABI-POLVO', name: 'Wasabi polvo', price: 9.44 },
  { id: 'TE-OOLONG', name: 'Té Oolong', price: 15.93 },
  { id: 'HOJUELAS-CAMARON', name: 'Hojuelas de camarón', price: 7.08 },
];

export async function GET() {
  try {
    await dbConnect();
    let products = await Product.find({});
    
    if (products.length === 0) {
      // Si no hay productos, inicialízalos
      await Product.insertMany(staticProducts);
      products = await Product.find({});
    }
    
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching or initializing products:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener o inicializar los productos' }, { status: 500 });
  }
}

