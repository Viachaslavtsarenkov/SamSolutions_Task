const locale = ({
    en: {
        fieldSimpleText : 'Min. field length 2 characters. The field must contain only letters',
        fieldPhoneNumber : 'Enter your phone in the format +375333751253',
        fieldPassword : 'Password must be at least 8 characters',
        bookNameValidation : "The title of the book must contain only letters and numbers." +
            " Minimum field length 1 character",
        descriptionValidation : 'Description must be at least 10 characters',
        yearValidation : 'Enter the year! For example: 1999',
        weightValidation: 'Enter weight in grams. For example: 580. Maximum weight 9999gr.',
        pagesValidation : 'Enter the number of pages. The maximum number of pages is 9999. For example: 120',
        materialValidation : 'The field must contain only letters. Minimum field length 3 characters',
        priceValidation : 'Enter the price of the book as a decimal. For example: 19.84',
        discountNameValidation :  "Discount name must contain only letters. Minimum field length 2 characters",
        discountFactor : 'Enter the discount percentage in the format 0.11. For example: 10% = 0.1',
    },
    ru: {
        fieldSimpleText : 'Мин. длинна поля 2 символа. Поле должно содержать только буквы',
        fieldPhoneNumber : 'Введите телефон в формате +375333751253',
        fieldPassword : 'Пароль должен состоять как минимум из 8 символов',
        bookNameValidation : "Название книги должно содержать только буквы и цифры. Минимальная длинная поля 1 символ",
        descriptionValidation : 'Описание должно состоять как минимум из 10 символов',
        yearValidation : 'Введите год!Например: 1999',
        weightValidation: 'Введите вес в граммах. Например: 580. Максимальный вес 9999гр.',
        pagesValidation : 'Введите количество страниц. Максимальное количество страниц 9999. Например: 120',
        materialValidation : 'Поле должно содержать только буквы. Минимальная длинна поля 3 символа',
        priceValidation : 'Введите цену книги десятьчной дробью. Например: 19.84',
        discountNameValidation :  "Название скидки должно содержать только буквы. Минимальная длинная поля 2 символа",
        discountFactor : 'Введите процент скидки в формате 0.11. Например: 10% = 0.1',
    }
});
export default {locale};