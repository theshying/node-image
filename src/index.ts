import {resolve,join}  from 'path'
import sharp from 'sharp'
import {getMd5, hasAlphaBg} from './utils'

const resizeOptions = {};
const toWebpOptions = {}
const toPngOptions = {
    compressionLevel: 6,
    palette: true,
    quality: 80
}

const target = resolve(__dirname, '../temp/dist')

const generatePath = (fileName:string) => join(target, `${fileName}`);

/**
 * 
 * @param file 图片路径, 默认传入两倍图
 */
const generateImage  = async (file:string)=> {
    const instance = sharp(file);
    const metaData = await instance.metadata();
    const {width, format, size, hasAlpha} = metaData
    const md5 = getMd5(file);
        // let originalInfo, tinyInfo;
        // if(hasAlphaBg(file)) {
    const  originalInfo =  await instance.png(toPngOptions).toFile(generatePath(`${md5}@x1.png`))
    const  tinyInfo = await instance.resize({ ...resizeOptions, width: parseInt(width as number / 2 + '', 10) }).png(toPngOptions).toFile(generatePath(`${md5}@x1.png`));
        // } else {

        // }
      //原图to webp
    const webpInfo = await instance.webp(toWebpOptions).toFile(generatePath(`${md5}@x2.webp`))
    //原图@0.5 to webp
    const tinyWebpInfo =  await instance.webp(toWebpOptions).toFile(generatePath(`${md5}@x1.webp`));
       
    return {
        ios: {
            x1:{...tinyInfo, path: generatePath(`${md5}@x1.png`)},
            x2:{...originalInfo, path: generatePath(`${md5}@x2.png`)}
        },
        android: {
            x1:{...webpInfo, path: generatePath(`${md5}@x1.png`)},
            x2:{...tinyWebpInfo, path: generatePath(`${md5}@x2.png`)} 
        }
    };

}

export default generateImage

