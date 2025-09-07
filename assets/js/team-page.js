// JavaScript for handling team page
document.addEventListener('DOMContentLoaded', async function() {
    // Get the team members container (row inside themex_team_area)
    const teamContainer = document.querySelector('.themex_team_area .row.team_top');
    if (!teamContainer) return;
    
    // Get the parent container for loading indicator
    const teamSection = document.querySelector('.themex_team_area');
    if (teamSection) {
        LoadingIndicator.createSectionLoading(teamSection);
    }

    try {
        // Fetch team members from API
        const teamMembers = await ApiService.getTeamMembers();

        // Clear existing team members
        teamContainer.innerHTML = '';

        // Add team members dynamically
        teamMembers.forEach(member => {
            if (member.isActive) {
                const memberElement = createTeamMemberElement(member);
                teamContainer.appendChild(memberElement);
            }
        });
        
        // Remove loading indicator
        if (teamSection) {
            LoadingIndicator.removeSectionLoading(teamSection);
        }
    } catch (error) {
        console.error('Error loading team members:', error);
        
        // Remove loading indicator even on error
        if (teamSection) {
            LoadingIndicator.removeSectionLoading(teamSection);
        }
    }
});

// Function to create team member element (matching themex_team_area format)
function createTeamMemberElement(member) {
    const memberDiv = document.createElement('div');
    memberDiv.className = 'col-lg-3 col-md-6 col-sm-12';

    // Clean WhatsApp number (remove spaces & non-numerics)
    const whatsappNumber = member.whatsapp ? member.whatsapp.replace(/[^0-9]/g, '') : '';

    memberDiv.innerHTML = `
        <div class="team-part all_color_team">
            <div class="witr_team_section">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="witr_team_content all_content_bg_color text-center">
                <h5><a href="#">${member.name}</a></h5>
                <span>${member.position || 'Team Member'}</span>
                <div class="team_o_icons all_team_icon_o_color">
                    <ul class="witr_pots_team_s">
                        ${member.email ? `<li><a href="mailto:${member.email}"><i class="icofont-email"></i></a></li>` : ''}
                        ${member.phone ? `<li><a href="tel:${member.phone}"><i class="icofont-phone"></i></a></li>` : ''}
                        ${whatsappNumber ? `<li><a href="https://wa.me/${whatsappNumber}"><i class="icofont-whatsapp"></i></a></li>` : ''}
                    </ul>
                </div>
            </div>
        </div>
    `;

    return memberDiv;
}
