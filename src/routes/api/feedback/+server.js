import { json } from '@sveltejs/kit';
import fs from 'fs';

export async function POST({ request }) {
    try {
        const feedback = await request.json();
        
        // Add timestamp
        feedback.timestamp = new Date().toISOString();
        
        // Convert feedback to string
        const feedbackString = JSON.stringify(feedback) + '\n';
        
        // Append to a file
        fs.appendFileSync('feedback.json', feedbackString);

        return json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false }, { status: 500 });
    }
}