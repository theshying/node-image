import generateImage from '../src/index'
import {resolve, join} from 'path'
import fs from 'fs';
import { writeFileSync } from 'fs';

const target = resolve(__dirname, '../temp/original')
const result = [];

const getTestResource = (type  = 'png') => {
    const res = fs.readdirSync(join(target, type))
    return res.map(item => {
        if(item.indexOf(type) !== -1) {
            return join(target,type, item)
        }
    })
}
describe.each(getTestResource('png'))(
    'test *.png', (path) => {
        test(`${path}`, async () => {
            const ret =  await generateImage(path)
            result.push(ret)
            expect(ret.ios).toBeTruthy()
        })
    }
)

afterAll(() => {
    const resultFilePath = resolve(__dirname, '../demo/result.json')
    const content = JSON.stringify(result,'', 4)
    writeFileSync(resultFilePath, content)
})