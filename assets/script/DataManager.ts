/*
 * @Description: 多语言配置
 * @Author: hanyajun
 * @Date: 2024-06-21 16:41:26
 * @LastEditTime: 2024-06-21 18:06:14
 */
export const DataManager = {
    'en': {
        level: 'Level 1',
        title: 'Bible Quiz \n For Christians',
        question: 'Where was Jesus born?',
        answer: {
            0: 'Bethlehem',
            1: 'Jerusalem',
            2: 'Nazareth',
            3: 'Egypt',
        } as { [key: number]: string }
    },
    'es': {
        level: 'Nivel 1',
        title: 'Preguntas Bíblicas \n Para Cristianos',
        question: '¿Dónde nació Jesús?',
        answer: {
            0: 'Belén',
            1: 'Jerusalén',
            2: 'Nazaret',
            3: 'Egipto',
        } as { [key: number]: string }
    },
    'pt': {
        level: 'Nível 1',
        title: 'Perguntas Bíblicas \n Para Cristãos',
        question: 'Onde nasceu Jesus?',
        answer: {
            0: 'Belém',
            1: 'Jerusalém',
            2: 'Nazaré',
            3: 'Egito',
        } as { [key: number]: string }
    }
}
