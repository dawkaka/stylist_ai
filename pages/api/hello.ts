// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prismadb'
import { ImageAnnotatorClient, v1 } from "@google-cloud/vision"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // const session = await getServerSession(req, res, authOptions)
  // if (!session || !session.user) {
  //   return res.status(401).json({ message: "Login required" })
  // }



  // Creates a client

  // Replace this with the path to your image file


  // Perform product search on the image
  // let result
  // try {
  //   result = await client.productSearch({
  //     image: { source: { imageUri: "https://d2xi011jjczziv.cloudfront.net/da7b4ca2-05bd-431d-abfe-bbf9d7703697.jpeg" } },
  //   });

  //   console.log(result);

  // } catch (error) {
  //   console.log(error)
  // }

  // const clarifai = new Clarifai.App({
  //   apiKey: process.env.CLARIFAI_KEY
  // });

  // send a request to the API with an image URL
  // clarifai.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
  //   .then(response => {
  //     // handle the response
  //     console.log(response.outputs[0].data.concepts);
  //   })
  //   .catch(error => {
  //     // handle the error
  //     console.log(error);
  //   });


  const client = new ImageAnnotatorClient();

  // Read the image file into memory
  const [image] = await client.imageProperties({ image: { source: { imageUri: "https://cf.shopee.ph/file/b12509df5340bbd6bcfffa2ad48f3110" } } });

  // Detect labels in the image
  // const [result] = await client.objectLocalization({
  //   image: { source: { imageUri: "https://assets.vogue.com/photos/6303e998bac6100a6d4cf022/1:1/w_2667,h_2667,c_limit/slide_20.jpg" } },

  // });
  // const objects = result.localizedObjectAnnotations;

  // Filter the detected objects to only include clothing
  // console.log(objects)
  // objects?.forEach((obj) =>
  //   console.log(obj, obj.boundingPoly?.normalizedVertices)
  // );

  // Extract information about the clothing items



  // Prints product details
  // console.log(`Product Name: ${result.displayName}`);
  // console.log(`Product Description: ${result.description}`);
  // console.log(`Product Category: ${result.productCategory}`);
  // console.log(`Product ID: ${result.productLabels[0].productId}`);

  // Call getProductDetails with path to your image file

  res.status(200).json({ name: 'John Doe' })
}
