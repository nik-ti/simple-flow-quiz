export type QuestionType = 'text' | 'choice' | 'multi-select';

export interface Question {
    id: string;
    text: {
        en: string;
        ru: string;
    };
    type: QuestionType;
    options?: {
        en: string[];
        ru: string[];
    };
    placeholder?: {
        en: string;
        ru: string;
    };
    conditionalInput?: {
        trigger: string; // The option that triggers the input
        placeholder: {
            en: string;
            ru: string;
        };
    };
}

export const questions: Question[] = [
    {
        id: 'industry',
        text: {
            en: 'What industry do you work in or trying to get into?',
            ru: 'В какой индустрии вы работаете или планируете работать?',
        },
        type: 'text',
        placeholder: {
            en: 'Short text',
            ru: 'Короткий ответ',
        },
    },
    {
        id: 'skill_level',
        text: {
            en: 'What is your current technical skill level in automations, working with AI tools, or basic coding?',
            ru: 'Каков ваш текущий уровень технических навыков в автоматизации, работе с ИИ или базовом программировании?',
        },
        type: 'choice',
        options: {
            en: [
                'Beginner (I use tools like ChatGPT, but I don’t really build automations or code)',
                'Intermediate (I can set up simple automations, use AI for different tasks)',
                'Advanced (I build automations for myself or others, work with APIs)',
                'Developer / Technical (I write code, integrate APIs, build full workflows)',
                'Other',
            ],
            ru: [
                'Новичок (Использую ChatGPT, но не создаю автоматизации)',
                'Средний (Могу настроить простые автоматизации)',
                'Продвинутый (Создаю автоматизации, работаю с API)',
                'Разработчик / Технический специалист (Пишу код, интегрирую API)',
                'Другое',
            ],
        },
        conditionalInput: {
            trigger: 'Other',
            placeholder: {
                en: 'Please describe',
                ru: 'Пожалуйста, опишите',
            },
        },
    },
    {
        id: 'automation_experience',
        text: {
            en: 'Have you ever built or used any automations for your work?',
            ru: 'Вы когда-нибудь создавали или использовали автоматизации в работе?',
        },
        type: 'choice',
        options: {
            en: [
                'Yes, regularly',
                'Yes, but very simple ones',
                'Tried once',
                'No',
                'Not sure exactly what “automation” means',
            ],
            ru: [
                'Да, регулярно',
                'Да, но очень простые',
                'Пробовал один раз',
                'Нет',
                'Не уверен, что именно означает "автоматизация"',
            ],
        },
    },
    {
        id: 'automation_tools_familiarity',
        text: {
            en: 'How familiar are you with automation tools like Make.com, n8n, or Zapier?',
            ru: 'Насколько вы знакомы с инструментами автоматизации, такими как Make.com, n8n или Zapier?',
        },
        type: 'choice',
        options: {
            en: [
                'Never used or heard about them',
                'I’ve heard about them but never tried',
                'I’ve tried simple automations',
                'I use automation regularly',
                'I build automations myself or have someone build them for me',
            ],
            ru: [
                'Никогда не слышал и не использовал',
                'Слышал, но не пробовал',
                'Пробовал простые автоматизации',
                'Использую регулярно',
                'Создаю сам или заказываю разработку',
            ],
        },
    },
    {
        id: 'ai_tools_frequency',
        text: {
            en: 'How often do you use basic AI tools like ChatGPT, Claude, Gemini, etc.?',
            ru: 'Как часто вы используете базовые ИИ-инструменты, такие как ChatGPT, Claude, Gemini и т.д.?',
        },
        type: 'choice',
        options: {
            en: ['Daily', 'A few times a week', 'A few times a month', 'Rarely', 'Never'],
            ru: ['Ежедневно', 'Несколько раз в неделю', 'Несколько раз в месяц', 'Редко', 'Никогда'],
        },
    },
    {
        id: 'specific_ai_tools',
        text: {
            en: 'Do you use other AI tools that are more specific to you?',
            ru: 'Используете ли вы другие, более специфичные ИИ-инструменты?',
        },
        type: 'choice',
        options: {
            en: ['Yes', 'No'],
            ru: ['Да', 'Нет'],
        },
        conditionalInput: {
            trigger: 'Yes',
            placeholder: {
                en: 'Please list a few tools you use or examples',
                ru: 'Пожалуйста, перечислите несколько инструментов или примеров',
            },
        },
    },
    {
        id: 'ai_usage_purpose',
        text: {
            en: 'What do you use AI mainly for right now?',
            ru: 'Для чего вы в основном используете ИИ сейчас?',
        },
        type: 'multi-select',
        options: {
            en: [
                'Writing',
                'Research',
                'Customer support',
                'Coding',
                'Automating tasks',
                'Planning / decisions',
                'Other',
            ],
            ru: [
                'Написание текстов',
                'Исследования',
                'Поддержка клиентов',
                'Программирование',
                'Автоматизация задач',
                'Планирование / принятие решений',
                'Другое',
            ],
        },
        conditionalInput: {
            trigger: 'Other',
            placeholder: {
                en: 'Please describe',
                ru: 'Пожалуйста, опишите',
            },
        },
    },
    {
        id: 'annoying_tasks',
        text: {
            en: 'In your day-to-day work, what manual, repetitive tasks annoy you the most or take lots of time?',
            ru: 'Какие ручные, повторяющиеся задачи в вашей работе раздражают вас больше всего или отнимают много времени?',
        },
        type: 'text',
        placeholder: {
            en: 'Short text',
            ru: 'Короткий ответ',
        },
    },
    {
        id: 'magic_wand_automation',
        text: {
            en: 'If you could wave a magic wand and automate one or a few things in your life or work, what would they be?',
            ru: 'Если бы вы могли взмахнуть волшебной палочкой и автоматизировать что-то в своей жизни или работе, что бы это было?',
        },
        type: 'text',
        placeholder: {
            en: 'Short text',
            ru: 'Короткий ответ',
        },
    },
    {
        id: 'missing_tool',
        text: {
            en: 'Do you feel like there should exist a tool that solves a specific problem you have, but you haven’t found it yet?',
            ru: 'Чувствуете ли вы, что должен существовать инструмент, решающий вашу конкретную проблему, но вы его еще не нашли?',
        },
        type: 'choice',
        options: {
            en: ['Yes', 'No'],
            ru: ['Да', 'Нет'],
        },
        conditionalInput: {
            trigger: 'Yes',
            placeholder: {
                en: 'What tool do you wish existed?',
                ru: 'Какой инструмент вы хотели бы, чтобы существовал?',
            },
        },
    },
    {
        id: 'anything_else',
        text: {
            en: 'Anything else you want to share?',
            ru: 'Хотите поделиться чем-то еще?',
        },
        type: 'text',
        placeholder: {
            en: 'Short text',
            ru: 'Короткий ответ',
        },
    },
    {
        id: 'contact_permission',
        text: {
            en: 'If we build/find a tool or have a suggestion based on what you shared, would you like us to send it to you?',
            ru: 'Если мы создадим/найдем инструмент или у нас будет предложение на основе того, чем вы поделились, хотите ли вы, чтобы мы отправили его вам?',
        },
        type: 'choice',
        options: {
            en: ['Yes', 'No'],
            ru: ['Да', 'Нет'],
        },
    },
];
