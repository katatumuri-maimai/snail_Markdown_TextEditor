export const themeList = [
    'Light',
    'Night',
    'Dark',
    'RoseQuartz',
    'Aquamarine',
    'Country',
    'DarkRed'
]

export default theme

function theme() {
    return {
        // Night
        Night: {
            main: {
                mainBackgroundColor: '#888888',
                secondBackgroundColor: '#5B5B5B',
                scrollBarColor: '#D1D1D1'
            },
            textView: {
                backgroundColor: '#FFFFFF',
                textColor: '#888888'
            },
            topBar: {
                titleTextColor: '#D1D1D1'
            },
            nav: {
                iconColor: '#D1D1D1',
            },
            menu: {
                titleColor: '#888888',
            },
            menuBtn: {
                BackgroundColor: '#888888',
                TextColor: '#E3E3E3',
                iconColor: '#D1D1D1',
                onPress: {
                    BackgroundColor: '#D1D1D1',
                    TextColor: '#888888',
                    iconColor: '#888888',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#E3E3E3',
                iconColor: '#D1D1D1',
                BoderColor: '#707070',
                pickerTextColor: '#FFFFFF',
                onPress: {
                    BackgroundColor: '#D1D1D1',
                    TextColor: '#888888',
                    iconColor: '#888888',
                    BoderColor: '#00000000',
                }
            },
            PlusBtn: {
                BackgroundColor: '#00000000',
                iconColor: '#D1D1D1',
            },
            typeSelectMenu: {
                BackgroundColor: '#D1D1D1',
                TextColor: '#5B5B5B',
                iconColor: '#5B5B5B',
                onPress: {
                    BackgroundColor: '#888888',
                    TextColor: '#D1D1D1',
                    iconColor: '#D1D1D1',
                }
            }
        },
        // RoseQuartz
        RoseQuartz: {
            main: {
                mainBackgroundColor: '#FFEEF8',
                secondBackgroundColor: '#F8BBD0',
                scrollBarColor: '#BF5F82'
            },
            textView: {
                backgroundColor: '#FFFFFF',
                textColor: '#4A061F'
            },
            topBar: {
                titleTextColor: '#BF5F82'
            },
            nav: {
                iconColor: '#FFEEF8'
            },
            menu: {
                titleColor: '#FFEEF8'
            },
            menuBtn: {
                BackgroundColor: '#FFEEF8',
                TextColor: '#C48B9F',
                iconColor: '#BF5F82',
                onPress: {
                    BackgroundColor: '#BF5F82',
                    TextColor: '#FFEEF8',
                    iconColor: '#FFEEF8',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#FFEEF8',
                iconColor: '#FFEEF8',
                BoderColor: '#FFEEF8',
                pickerTextColor: '#BF5F82',
                onPress: {
                    BackgroundColor: '#BF5F82',
                    TextColor: '#FFEEF8',
                    iconColor: '#FFEEF8',
                    BoderColor: '#00000000',
                }
            },
            PlusBtn: {
                BackgroundColor: '#00000000',
                iconColor: '#BF5F82',
            },
            typeSelectMenu: {
                BackgroundColor: '#C48B9F',
                TextColor: '#FFEEF8',
                iconColor: '#FFEEF8',
                onPress: {
                    BackgroundColor: '#BF5F82',
                    TextColor: '#F8BBD0',
                    iconColor: '#F8BBD0',
                }
            }
        },
        // Aquamarine
        Aquamarine: {
            main: {
                mainBackgroundColor: '#E1F5FE',
                secondBackgroundColor: '#B3E5FC',
                scrollBarColor: '#B3E5FC'
            },
            textView: {
                backgroundColor: '#FFFFFF',
                textColor: '#82B3C9'
            },
            topBar: {
                titleTextColor: '#95bedb'
            },
            nav: {
                iconColor: '#FAFAFA',
            },
            menu: {
                titleColor: '#E1F5FE',
            },
            menuBtn: {
                BackgroundColor: '#E1F5FE',
                TextColor: '#82B3C9',
                iconColor: '#82B3C9',
                onPress: {
                    BackgroundColor: '#FAFAFA',
                    TextColor: '#82B3C9',
                    iconColor: '#82B3C9',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#FFFFFF',
                iconColor: '#FFFFFF',
                BoderColor: '#FFFFFF',
                pickerTextColor: '#82B3C9',
                onPress: {
                    BackgroundColor: '#FAFAFA',
                    TextColor: '#82B3C9',
                    iconColor: '#82B3C9',
                    BoderColor: '#00000000',
                }
            },
            PlusBtn: {
                BackgroundColor: '#00000000',
                iconColor: '#FAFAFA',
            },
            typeSelectMenu: {
                BackgroundColor: '#FAFAFA',
                TextColor: '#82B3C9',
                iconColor: '#82B3C9',
                onPress: {
                    BackgroundColor: '#82B3C9',
                    TextColor: '#FAFAFA',
                    iconColor: '#FAFAFA',
                }
            }
        },
        // Country
        Country: {
            main: {
                mainBackgroundColor: '#BE9C91',
                secondBackgroundColor: '#D3B8AE',
                scrollBarColor: '#D3B8AE'
            },
            textView: {
                backgroundColor: '#FFFFFF',
                textColor: '#BE9C91'
            },
            topBar: {
                titleTextColor: '#FFFFFF'
            },
            nav: {
                iconColor: '#FFFFE5',
            },
            menu: {
                titleColor: '#BE9C91',
            },
            menuBtn: {
                BackgroundColor: '#BE9C91',
                TextColor: '#FFFFE5',
                iconColor: '#FFECB3',
                onPress: {
                    BackgroundColor: '#FFECB3',
                    TextColor: '#BE9C91',
                    iconColor: '#BE9C91',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#FFFFE5',
                iconColor: '#FFFFE5',
                BoderColor: '#FFFFE5',
                pickerTextColor: '#FFFFE5',
                onPress: {
                    BackgroundColor: '#FFECB3',
                    TextColor: '#BE9C91',
                    iconColor: '#BE9C91',
                    BoderColor: '#BE9C91',
                }
            },
            PlusBtn: {
                BackgroundColor: '#00000000',
                iconColor: '#FFFFE5',
            },
            typeSelectMenu: {
                BackgroundColor: '#FFECB3',
                TextColor: '#D3B8AE',
                iconColor: '#D3B8AE',
                onPress: {
                    BackgroundColor: '#FFECB3',
                    TextColor: '#D3B8AE',
                    iconColor: '#D3B8AE',
                }
            }
        },
        // Dark
        Dark: {
            main: {
                mainBackgroundColor: '#888888',
                secondBackgroundColor: '#5B5B5B',
                scrollBarColor: '#888888'
            },
            textView: {
                backgroundColor: '#5B5B5B',
                textColor: '#E3E3E3'
            },
            topBar: {
                titleTextColor: '#D1D1D1'
            },
            nav: {
                iconColor: '#D1D1D1',
            },
            menu: {
                titleColor: '#888888',
            },
            menuBtn: {
                BackgroundColor: '#888888',
                TextColor: '#E3E3E3',
                iconColor: '#E3E3E3',
                onPress: {
                    BackgroundColor: '#888888',
                    TextColor: '#E3E3E3',
                    iconColor: '#E3E3E3',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#707070',
                iconColor: '#707070',
                BoderColor: '#707070',
                pickerTextColor: '#FFFFFF',
                onPress: {
                    BackgroundColor: '#D1D1D1',
                    TextColor: '#888888',
                    iconColor: '#888888',
                    BoderColor: '#00000000',
                }
            },
            PlusBtn: {
                BackgroundColor: '#00000000',
                iconColor: '#D1D1D1',
            },
            typeSelectMenu: {
                BackgroundColor: '#D1D1D1',
                TextColor: '#5B5B5B',
                iconColor: '#5B5B5B',
                onPress: {
                    BackgroundColor: '#888888',
                    TextColor: '#D1D1D1',
                    iconColor: '#D1D1D1',
                }
            }
        },
        // Light
        Light: {
            main: {
                mainBackgroundColor: '#F5F5F5',
                secondBackgroundColor: '#CBCBCB',
                scrollBarColor: '#CBCBCB'
            },
            textView: {
                backgroundColor: '#FFFFFF',
                textColor: '#6D6D6D'
            },
            topBar: {
                titleTextColor: '#6D6D6D'
            },
            nav: {
                iconColor: '#FFFFFF',
            },
            menu: {
                titleColor: '#F5F5F5',
            },
            menuBtn: {
                BackgroundColor: '#F5F5F5',
                TextColor: '#CBCBCB',
                iconColor: '#CBCBCB',
                onPress: {
                    BackgroundColor: '#F5F5F5',
                    TextColor: '#CBCBCB',
                    iconColor: '#CBCBCB',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#F5F5F5',
                iconColor: '#F5F5F5',
                BoderColor: '#F5F5F5',
                pickerTextColor: '#F5F5F5',
                onPress: {
                    BackgroundColor: '#00000000',
                    TextColor: '#CBCBCB',
                    iconColor: '#CBCBCB',
                    BoderColor: '#00000000',
                }
            },
            PlusBtn: {
                BackgroundColor: '#FFFFFF',
                iconColor: '#FFFFFF',
            },
            typeSelectMenu: {
                BackgroundColor: '#FFFFFF',
                TextColor: '#CBCBCB',
                iconColor: '#CBCBCB',
                onPress: {
                    BackgroundColor: '#F5F5F5',
                    TextColor: '#FFFFFF',
                    iconColor: '#FFFFFF',
                }
            }
        },
        // DarkRed
        DarkRed: {
            main: {
                mainBackgroundColor: '#78445F',
                secondBackgroundColor: '#4D313F',
                scrollBarColor: '#D2B8C8'
            },
            textView: {
                backgroundColor: '#4D313F',
                textColor: '#EBD7DF'
            },
            topBar: {
                titleTextColor: '#EBD7DF'
            },
            nav: {
                iconColor: '#D2B8C8',
            },
            menu: {
                titleColor: '#78445F',
            },
            menuBtn: {
                BackgroundColor: '#78445F',
                TextColor: '#EBD7DF',
                iconColor: '#D2B8C8',
                onPress: {
                    BackgroundColor: '#78445F',
                    TextColor: '#EBD7DF',
                    iconColor: '#D2B8C8',
                }
            },
            menuBtnChild: {
                BackgroundColor: '#00000000',
                TextColor: '#EBD7DF',
                iconColor: '#EBD7DF',
                BoderColor: '#EBD7DF',
                pickerTextColor: '#EBD7DF',
                onPress: {
                    BackgroundColor: '#D2B8C8',
                    TextColor: '#78445F',
                    iconColor: '#78445F',
                    BoderColor: '#00000000',
                }
            },
            PlusBtn: {
                BackgroundColor: '#D2B8C8',
                iconColor: '#D2B8C8',
            },
            typeSelectMenu: {
                BackgroundColor: '#D2B8C8',
                TextColor: '#4D313F',
                iconColor: '#4D313F',
                onPress: {
                    BackgroundColor: '#78445F',
                    TextColor: '#D2B8C8',
                    iconColor: '#D2B8C8',
                }
            }
        },
    }
}