import {getMd5, hasAlphaBg} from '../src/utils'
import {resolve} from 'path'
const pngPath = resolve(__dirname, '../temp/original/png/5.png')
const pngPath1 = resolve(__dirname, '../temp/original/png/2.png')
describe('test utils', () => {
    test('getMd5', () => {
        const md5 = getMd5(pngPath)
        expect(md5.length) === 32

    })

    test('hasAlphaBg', async () => {
        const res = await hasAlphaBg(pngPath)
        expect(res).toBe(false)
    })
    
    test('hasAlphaBg', async () => {
        const res = await hasAlphaBg(pngPath1)
        expect(res).toBe(true)
    })
})