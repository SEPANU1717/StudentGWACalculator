import { toPng } from 'html-to-image';

export const exportToImage = async (elementId: string, fileName: string = 'gwa-result') => {
    const node = document.getElementById(elementId);
    if (!node) return;

    try {
        const dataUrl = await toPng(node, {
            cacheBust: true,
            backgroundColor: '#fff',
            style: {
                transform: 'scale(1)',
            }
        });

        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Failed to export image:', err);
    }
};
