import { readFileSync } from 'fs';
import sparkMd5 from 'spark-md5';
import {createCanvas, loadImage} from 'canvas'
import sharp from 'sharp';
/**
 * 获取文件的md5
 * @param path 文件路径
 * @returns  md5
 */
const getMd5 = (path: string) => {
    const buffer = readFileSync(path);
    const spark = new sparkMd5.ArrayBuffer();
    const hash = spark.append(buffer).end();
    return hash
}

/**
 * 判断图片是否存在透明/半透明背景
 * @param path 图片路径
 * @returns 
 */
const hasAlphaBg = async (path: string):Promise<boolean> => {
    const {width = 0, height = 0}  = await sharp(path).metadata()
    const canvas = createCanvas(width,height);
    const context = canvas.getContext('2d')
    context.clearRect(0,0, width, height);
    const image = await loadImage(path)
    context.drawImage(image, 0, 0, width, height);
    const imageData = context.getImageData(0, 0,width, height).data;
    let isAlphaBackground = false;
    for(let i=3; i< imageData.length; i+=4) {
        if(imageData[i] !== 255) {
            isAlphaBackground = true;
            break;
        }
    }
    return isAlphaBackground;
}

const isTest = () => process.env.NODE_ENV === 'test'

export {
    getMd5,
    hasAlphaBg,
    isTest
}