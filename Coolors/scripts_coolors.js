/**
 * ==========================================================================
 * CÁC NGUYÊN TẮC PHỐI MÀU TRONG LÝ THUYẾT MÀU SẮC (COLOR THEORY)
 * ==========================================================================
 * Lý thuyết màu sắc định nghĩa các quy tắc và hướng dẫn để kết hợp màu sắc
 * tạo nên những bảng màu hài hòa về mặt thẩm mỹ. Ở đây chúng ta áp dụng 4 quy tắc chính:
 *
 * 1. Monochromatic (Đơn sắc):
 *    - Định nghĩa: Sử dụng các biến thể khác nhau về độ bão hòa (S) và độ sáng (B) của cùng một tông màu chủ đạo (Hue).
 *    - Thẩm mỹ: Rất nhất quán, dịu mắt, hiện đại và cực kỳ phù hợp cho phong cách tối giản (minimalism).
 *
 * 2. Analogous (Tương đồng):
 *    - Định nghĩa: Sử dụng các tông màu nằm liền kề nhau trên bánh xe màu (lệch góc nhỏ khoảng 15-30 độ).
 *    - Thẩm mỹ: Tạo cảm giác êm dịu, thoải mái, tự nhiên, mô phỏng các hiệu ứng chuyển màu trong tự nhiên (như hoàng hôn).
 *
 * 3. Complementary (Bổ túc trực tiếp):
 *    - Định nghĩa: Kết hợp các màu đối xứng nhau 180 độ trên bánh xe màu kèm theo các biến thể độ sáng.
 *    - Thẩm mỹ: Độ tương phản cực cao, năng động và rực rỡ. Rất tốt để tạo điểm nhấn hoặc nút kêu gọi hành động.
 *
 * 4. Tetradic (Bổ túc kép / Bộ bốn):
 *    - Định nghĩa: Sử dụng hai cặp màu bổ túc trực tiếp trên bánh xe màu (lệch góc: 0, 30, 180, 210 độ).
 *    - Thẩm mỹ: Phong phú, đa dạng sắc màu và phức tạp. Cần cân đối tốt nhưng mang lại sự đa dạng tối đa.
 * ==========================================================================
 */
class PaletteGenerator {
    static hsbToHex(h, s, v) {
        s /= 100;
        v /= 100;
        const k = (n) => (n + h / 60) % 6;
        const f = (n) => v - v * s * Math.max(Math.min(k(n), 4 - k(n), 1), 0);

        const toHex = (x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`.toUpperCase();
    }

    static getRandomBaseColor(style = 'random') {
        const h = Math.floor(Math.random() * 360);
        let s, b;

        switch (style) {
            case 'pastel':
                s = Math.floor(Math.random() * 20) + 15; // 15-35%
                b = Math.floor(Math.random() * 10) + 90; // 90-100%
                break;
            case 'earth':
                s = Math.floor(Math.random() * 20) + 40; // 40-60%
                b = Math.floor(Math.random() * 20) + 30; // 30-50%
                break;
            case 'neon':
                s = Math.floor(Math.random() * 10) + 90; // 90-100%
                b = Math.floor(Math.random() * 10) + 90; // 90-100%
                break;
            default:
                s = Math.floor(Math.random() * 100);
                b = Math.floor(Math.random() * 100);
        }
        return { h, s, b };
    }

    /**
     * Tạo bảng màu hài hòa gồm 4 màu dựa trên quy tắc phối màu được chọn.
     */
    static generateHarmoniousPalette(style = 'random', theory = 'analogous') {
        const base = this.getRandomBaseColor(style);
        const colors = [];

        switch (theory) {
            case 'monochromatic':
                // Giữ nguyên tông Hue, thay đổi Saturation và Brightness
                colors.push(this.hsbToHex(base.h, base.s, base.b));
                colors.push(this.hsbToHex(base.h, Math.max(10, base.s - 25), Math.min(100, base.b + 15)));
                colors.push(this.hsbToHex(base.h, Math.min(100, base.s + 15), Math.max(10, base.b - 25)));
                colors.push(this.hsbToHex(base.h, Math.max(5, base.s - 45), Math.min(100, base.b + 25)));
                break;

            case 'complementary':
                // Màu gốc và các màu bổ túc đối xứng (H + 180)
                const compH = (base.h + 180) % 360;
                colors.push(this.hsbToHex(base.h, base.s, base.b));
                colors.push(this.hsbToHex(base.h, Math.max(10, base.s - 30), Math.min(100, base.b + 20)));
                colors.push(this.hsbToHex(compH, base.s, base.b));
                colors.push(this.hsbToHex(compH, Math.max(10, base.s - 30), Math.min(100, base.b + 20)));
                break;

            case 'tetradic':
                // Hai cặp màu bổ túc đối xứng (lệch góc: 0, 30, 180, 210 độ)
                const h1 = base.h;
                const h2 = (base.h + 30) % 360;
                const h3 = (base.h + 180) % 360;
                const h4 = (base.h + 210) % 360;
                colors.push(this.hsbToHex(h1, base.s, base.b));
                colors.push(this.hsbToHex(h2, base.s, base.b));
                colors.push(this.hsbToHex(h3, base.s, base.b));
                colors.push(this.hsbToHex(h4, base.s, base.b));
                break;

            case 'analogous':
            default:
                // Bốn màu kề nhau trên bánh xe màu (khoảng cách dao động ngẫu nhiên từ 15 đến 30 độ)
                // Đồng thời điều chỉnh nhẹ độ bão hòa (S) và độ sáng (B) để tạo độ tương phản rõ nét hơn
                const hueStep = Math.floor(Math.random() * 16) + 15; // Dao động từ 15 đến 30 độ
                for (let i = 0; i < 4; i++) {
                    const h = (base.h + i * hueStep + 360) % 360;
                    const s = Math.max(10, Math.min(100, base.s + (i % 2 === 0 ? 12 : -12)));
                    const b = Math.max(10, Math.min(100, base.b + (i % 2 === 0 ? -12 : 12)));
                    colors.push(this.hsbToHex(h, s, b));
                }
                break;
        }

        return {
            colors,
            theory,
            style
        };
    }
}

const panels = document.querySelectorAll('.color-panel');

function generateAndApplyPalette() {
    const styles = ['random', 'pastel', 'earth', 'neon'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];

    const theories = ['monochromatic', 'analogous', 'complementary', 'tetradic'];
    const randomTheory = theories[Math.floor(Math.random() * theories.length)];

    const paletteData = PaletteGenerator.generateHarmoniousPalette(randomStyle, randomTheory);

    panels.forEach((panel, index) => {
        const hex = paletteData.colors[index];
        panel.style.backgroundColor = hex;

        // Cập nhật text hiển thị trên UI
        const hexDisplay = panel.querySelector('.hex-code');
        const nameDisplay = panel.querySelector('.color-name');
        if (hexDisplay) hexDisplay.textContent = hex.replace('#', '');
        if (nameDisplay) {
            const theoryMap = {
                'monochromatic': 'Đơn sắc',
                'analogous': 'Tương đồng',
                'complementary': 'Bổ túc',
                'tetradic': 'Bổ túc kép'
            };
            const styleMap = {
                'random': 'Ngẫu nhiên',
                'pastel': 'Pastel',
                'earth': 'Tông đất',
                'neon': 'Neon'
            };
            const vnTheory = theoryMap[paletteData.theory] || paletteData.theory;
            const vnStyle = styleMap[paletteData.style] || paletteData.style;
            nameDisplay.textContent = `${vnTheory} (${vnStyle})`;
        }

        // Tính toán độ sáng tương đối (Relative Luminance) để tự động đổi màu text tương phản
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const isDark = luminance < 0.6;

        // Thay đổi màu text dựa trên độ sáng tối của màu nền
        if (hexDisplay) {
            hexDisplay.className = `hex-code text-3xl font-black tracking-wider mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`;
        }
        if (nameDisplay) {
            nameDisplay.className = `color-name text-sm font-medium tracking-wide mb-3 ${isDark ? 'text-white/80' : 'text-gray-600'}`;
        }

        // Thay đổi màu các nút icon thao tác ở trên đầu panel
        const actionIcons = panel.querySelectorAll('.panel-actions button');
        actionIcons.forEach(btn => {
            const isWhite = btn.classList.contains('text-white');
            const isGray = btn.classList.contains('text-gray-700');
            if (isDark && isGray) {
                btn.classList.replace('text-gray-700', 'text-white');
            } else if (!isDark && isWhite) {
                btn.classList.replace('text-white', 'text-gray-700');
            }
        });
    });
}

// Gán sự kiện click cho tất cả nút bấm: bấm bất kỳ nút nào cũng thay đổi đồng thời 4 panel
panels.forEach(panel => {
    const btn = panel.querySelector('.random-panel-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            generateAndApplyPalette();
        });
    }
});
