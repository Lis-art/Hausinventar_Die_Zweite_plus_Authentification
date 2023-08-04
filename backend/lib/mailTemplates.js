export const passwordResetMailTemplate = ({name, resetLink}) => ``
Hi ${name || ""},
Please click <a href="${resetLink || process.env.RENDER_EXTERNAL_URL}"
`