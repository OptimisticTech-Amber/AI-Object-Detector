"use client"

import React from 'react'
import { useState,useRef,useEffect } from "react";
import Webcam from 'react-webcam';
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import renderPrediction from '@/utils/renderprediction';

let detectInterval;

const Detection = () => {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [isLoading,setIsLoading]=useState(false);


    async function RunCoco(){

        setIsLoading(true);
        const Net = await cocoSSDLoad();
        setIsLoading(false);

        detectInterval = setInterval(()=>{
        runObjectDetection(Net);
        },10);

    }

        async function runObjectDetection(Net){

            if( canvasRef.current && webcamRef.current!==null 
                && webcamRef.current.video?.readyState === 4
            ){
                canvasRef.current.width = webcamRef.current.video.videoWidth;
                canvasRef.current.height = webcamRef.current.video.videoHeight;
                 

                // detected Objects 

                const detected = await Net.detect(
                    webcamRef.current.video, undefined,0.6
                );
                console.log(detected);
                const ctx = canvasRef.current.getContext("2d");
                renderPrediction(detected,ctx);
            }
        }

        const ShowmyVideo =()=>{

            if(webcamRef.current!==null && webcamRef.current.video?.readyState===4 ){
                const myVideoWidth = webcamRef.current.video.videoWidth;
                const myVideoHeight = webcamRef.current.video.widthHeight;

                 webcamRef.current.video.height = myVideoHeight 
                 webcamRef.current.video.width  = myVideoWidth 
            }
        }

        useEffect(
            ()=>{
            RunCoco();
        ShowmyVideo();
        
        },[])


  return (
    <div className="mt-8">
        {isLoading ?( <div className="gradient-title font-extrabold text-3xl md:text-5xl">Loading...</div>):
        (
            <div className="flex relative justify-center items-center p-1.5 gradient rounded-md">
             <Webcam muted ref={webcamRef} className="rounded-md w-full lg:h-[500px]"/>
             <canvas ref={canvasRef} className="absolute top-0 left-0 z-9999 w-full lg:h-[500px]"/>
            </div>
        )}
    </div>
  )
}

export default Detection