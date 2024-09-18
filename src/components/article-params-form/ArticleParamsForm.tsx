import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, FormEvent } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from 'components/text';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type articleParamsFormPros = {
	articleState: ArticleStateType;
	setArticleState: (val: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: articleParamsFormPros) => {
	const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setisMenuOpen,
		rootRef,
	});

	const [font, setFont] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const reset = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleState(defaultArticleState);
	};

	const submit = (event: FormEvent) => {
		setArticleState({
			fontFamilyOption: font,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			fontSizeOption: fontSize,
			contentWidth: contentWidth,
		});
		event.preventDefault();
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				setIsOpen={() => setisMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={submit}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={font}
						onChange={setFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
